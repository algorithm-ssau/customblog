/*
 * Copyright 2020 CustomBlog
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.pde.blog.service;

import com.haulmont.bali.util.Preconditions;
import com.haulmont.cuba.core.global.DataManager;
import com.haulmont.cuba.core.global.TimeSource;
import com.pde.blog.entity.Category;
import com.pde.blog.entity.Publication;
import jdk.internal.jline.internal.Nullable;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.UUID;

@Service(PublicationsService.NAME)
public class PublicationsServiceBean implements PublicationsService {

    @Inject
    private TimeSource timeSource;
    @Inject
    private DataManager dataManager;

    @Override
    @Nullable
    public Publication getPublicationById(String serializedUuid) {
        Preconditions.checkNotEmptyString(serializedUuid);

        UUID uuid = UUID.fromString(serializedUuid);

        Publication publication = dataManager.load(Publication.class)
                .query("select p " +
                        "from blog_Publication p " +
                        "where p.visible = true " +
                        "   and p.id = :id")
                .parameter("id", uuid)
                .view("publication-rest-full")
                .optional().orElse(null);

        return publication;
    }

    @Override
    public List<Category> getCategories() {
        List<Category> categories = dataManager.load(Category.class)
                .query("select c " +
                        "from blog_Category c " +
                        "where c.active = true")
                .list();

        return categories;
    }

    @Override
    public List<Publication> getCategoryPublications(Category category) {
        Preconditions.checkNotNullArgument(category);

        List<Publication> publications = dataManager.load(Publication.class)
                .query("select p " +
                        "from blog_Publication p " +
                        "where p.releaseDate >= :currentTime " +
                        "   and p.category = :category " +
                        "   and p.visible = true " +
                        "   and p.author.banned = false")
                .parameter("currentTime", timeSource.currentTimestamp())
                .parameter("category", category)
                .view("publication-rest-preview")
                .list();

        return publications;
    }

    @Override
    public List<Publication> getCategoryNamePublications(String categoryName) {
        Preconditions.checkNotEmptyString(categoryName);

        List<Publication> publications = dataManager.load(Publication.class)
                .query("select p " +
                        "from blog_Publication p " +
                        "where p.releaseDate >= :currentTime " +
                        "   and p.category.name = :categoryName " +
                        "   and p.visible = true " +
                        "   and p.author.banned = false")
                .parameter("currentTime", timeSource.currentTimestamp())
                .parameter("categoryName", categoryName)
                .view("publication-rest-preview")
                .list();

        return publications;
    }
}