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

package com.pde.blog.entity;

import com.haulmont.chile.core.annotations.MetaProperty;
import com.haulmont.cuba.core.entity.StandardEntity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Table(name = "BLOG_COMMENT")
@Entity(name = "blog_Comment")
public class Comment extends StandardEntity {

    private static final long serialVersionUID = -3909227488310780646L;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PUBLICATION_ID")
    private Publication publication;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID")
    private Comment parent;

    @Column(name = "CONTENT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AUTHOR_ID")
    private ExtUser author;

    @JoinTable(name = "COMMENT_RATE_LINK",
            joinColumns = @JoinColumn(name = "COMMENT_ID"),
            inverseJoinColumns = @JoinColumn(name = "RATE_ID"))
    @ManyToMany
    private Set<Rate> rates = new HashSet<>();

    @MetaProperty(related = "rates")
    public Double getRating() {
        if (rates == null || rates.isEmpty()) return 0d;

        return rates.stream()
                .map(Rate::getValue)
                .reduce(Double::sum)
                .orElse(0d);
    }

    public Publication getPublication() {
        return publication;
    }

    public void setPublication(Publication publication) {
        this.publication = publication;
    }

    public Comment getParent() {
        return parent;
    }

    public void setParent(Comment parent) {
        this.parent = parent;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ExtUser getAuthor() {
        return author;
    }

    public void setAuthor(ExtUser author) {
        this.author = author;
    }

    public Set<Rate> getRates() {
        return rates;
    }

    public void setRates(Set<Rate> rates) {
        this.rates = rates;
    }
}