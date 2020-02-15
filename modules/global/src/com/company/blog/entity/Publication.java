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

package com.company.blog.entity;

import com.haulmont.chile.core.annotations.MetaProperty;
import com.haulmont.chile.core.annotations.NamePattern;
import com.haulmont.cuba.core.entity.StandardEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@NamePattern("%s|title")
@Table(name = "BLOG_PUBLICATION")
@Entity(name = "blog_Publication")
public class Publication extends StandardEntity {

    private static final long serialVersionUID = 65858327891460044L;

    @NotNull
    @Column(name = "TITLE", length = 1024, nullable = false)
    private String title;

    @Lob
    @NotNull
    @Column(name = "CONTENT", nullable = false)
    private String content;

    @NotNull
    @Column(name = "RELEASE_DATE", nullable = false)
    private Date releaseDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATEGORY_ID")
    private Category category;

    @JoinTable(name = "PUBLICATION_TAG_LINK",
            joinColumns = @JoinColumn(name = "PUBLICATION_ID"),
            inverseJoinColumns = @JoinColumn(name = "TAG_ID"))
    @ManyToMany
    private Set<Tag> tags = new HashSet<>();


    @JoinTable(name = "PUBLICATION_RATE_LINK",
            joinColumns = @JoinColumn(name = "PUBLICATION_ID"),
            inverseJoinColumns = @JoinColumn(name = "RATE_ID"))
    @ManyToMany
    private Set<Rate> rates = new HashSet<>();

    @Column(name = "VISIBLE")
    private Boolean visible;

    @MetaProperty(related = "rates")
    public Double getRating() {
        if (rates == null || rates.isEmpty()) return 0d;

        Double sum = 0d;
        for (Rate rate : rates) {
            sum += rate.getValue();
        }
        return sum;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Set<Rate> getRates() {
        return rates;
    }

    public void setRates(Set<Rate> rates) {
        this.rates = rates;
    }
}